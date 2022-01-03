import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export function GetRecords(context: WebPartContext, recordType: string): Promise<any> {
    const url: string =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getbytitle('OutgoingLibrary')/items?$select=*,EncodedAbsUrl&$filter=RecordType eq '" + recordType + "'&$orderby=Title desc";
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
    return postFile(context, file).then((response: SPHttpClientResponse) => {
        return getRecordUsingName(file.name, context).then((result) => {
            const id = result[0].Id
            return updateItem(context, id, file.name, RecordType)
                .then((id) => {
                    return getOneRecord(context, id).then((json) => {
                        console.log(json)
                        return json;
                    }) as Promise<any>;
                })
                .catch((err) => console.log(err));
        })
    }) as Promise<any>
};

export function postFile(context, file): Promise<any> {
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
        .post(url, SPHttpClient.configurations.v1, options).then((response: SPHttpClientResponse) => {
            return response
        })
}

export function updateItem(context, id: number, fileName, RecordType): Promise<any> {
    console.log(fileName)
    let updateUrl =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
        id +
        ")";
    const recordInfo: any = {
        Title: fileName,
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
    return context.spHttpClient
        .post(updateUrl, SPHttpClient.configurations.v1, recordOption).then(() => { return id })
}

export function getOneRecord(context, id): Promise<any> {
    let siteUrl =
        context.pageContext.web.absoluteUrl +
        "/_api/web/lists/getByTitle('OutgoingLibrary')/items(" +
        id +
        ")";
    return context.spHttpClient.get(siteUrl, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
        return response.json();
    }).then((json) => {
        console.log(json)
        return json;
    })
}

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

export function editAndGetRecord(context: WebPartContext, id: number, inputs): Promise<any> {
    return editRecord(context, id, inputs).then((response) => {
        return getOneRecord(context, id).then((json) => {
            console.log(json)
            return json
        }) as Promise<any>
    })

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