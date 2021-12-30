import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";


export function GetRecords(context: WebPartContext, recordType: string): Promise<any> {
    const url: string =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getbytitle('OutgoingLibrary')/items?$select=*,EncodedAbsUrl&$filter=RecordType eq '" + recordType + "'";
    return context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json();
        })
        .then((json) => {
            return json.value;
        }) as Promise<any>;
}

export function handleSubmit(file: any, context: WebPartContext, RecordType: string): Promise<any> {
    const url: string =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getByTitle('OutgoingLibrary')/RootFolder/files/add(url='" +
        file.name +
        "',overwrite=true)";
    var options: ISPHttpClientOptions = {
        headers: {
            Accept: "application/json",
        },
        body: file,
    };
    return context.spHttpClient
        .post(url, SPHttpClient.configurations.v1, options)
        .then(() => {
            getRecordUsingName(file.name, context).then((response) => {
                let updateUrl =
                    context.pageContext.web.absoluteUrl +
                    "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
                    response[0].Id +
                    ")";
                const recordInfo: any = {
                    Title: file.name,
                    RecordType,
                };

                const headers: any = {
                    "X-HTTP-Method": "MERGE",
                    "IF-MATCH": "*",
                };
                const recordOption: ISPHttpClientOptions = {
                    headers: headers,
                    body: JSON.stringify(recordInfo),
                };

                context.spHttpClient
                    .post(updateUrl, SPHttpClient.configurations.v1, recordOption)
                    .then((response: SPHttpClientResponse) => {
                        return response
                    })
                    .catch((err) => console.log(err));
            });
        })
        .catch((err) => console.log(err));
};

export function getRecordUsingName(fileName: string, context: WebPartContext): Promise<any> {
    let url =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getByTitle('OutgoingLibrary')/items?$filter=FileLeafRef eq '" +
        fileName +
        "'";
    return context.spHttpClient
        .get(url, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json();
        })
        .then((json) => {
            return json.value;
        }) as Promise<any>;
}


export function editRecord(context: WebPartContext, id: number, inputs: any) {
    console.log(id, inputs)
    const url: string =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
        id +
        ")";
    const headers: any = {
        "X-HTTP-Method": "MERGE",
        "IF-MATCH": "*",
    };
    const recordOption: ISPHttpClientOptions = {
        headers: headers,
        body: JSON.stringify(inputs),
    };

    return context.spHttpClient
        .post(url, SPHttpClient.configurations.v1, recordOption)
        .then((response: SPHttpClientResponse) => {
            return response
        })
        .catch((err) => console.log(err));
}

export function submitRemark(context: WebPartContext, Title: string, Comments: string, RecordId: number): Promise<any> {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('RecordRemarks')/items";

    const data = {
        Title,
        Comments,
        RecordId
    };

    const remarkOptions: ISPHttpClientOptions = {
        body: JSON.stringify(data),
    };

    return context.spHttpClient.post(url, SPHttpClient.configurations.v1, remarkOptions).then((response: SPHttpClientResponse) => {
        return response
    })
}

export function getRemark(context: WebPartContext, id: number): Promise<any> {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('RecordRemarks')/items?$select=Comments&$filter=RecordId eq " + id;

    return context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
        return response.json();
    })
}