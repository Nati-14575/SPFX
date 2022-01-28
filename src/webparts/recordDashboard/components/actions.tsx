import {
    SPHttpClient,
    ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
const getHeader = {
    headers: {
        'accept': 'application/json;'
    }
}
const postHeader = {
    headers: {
        // "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        'content-type': 'application/json;odata.metadata=full',
        'accept': 'application/json;odata.metadata=full'
    }
}
const deleteHeader = {
    headers: {
        'content-type': 'application/json;odata.metadata=full',
        "IF-MATCH": "*",
        "X-HTTP-Method": "DELETE"
    }
}
const updateHeader = {
    headers: {
        // "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        'content-type': 'application/json;odata.metadata=full',
        'accept': 'application/json;odata.metadata=full',
        "IF-MATCH": "*",
        "X-HTTP-Method": "MERGE"
    }
}

export function getAllItems(context: WebPartContext, listName: string) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items"
    return get(context, url).then((result) => {
        return result
    })
}

export function getItemById(context: WebPartContext, listName: string, id) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items?$select=*,EncodedAbsUrl,FileLeafRef&$filter=Id eq " + id
    return get(context, url).then((result) => {
        return result
    }).catch((err) => console.log(err))
}

export function getFilteredItems(context: WebPartContext, listName: string, query) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items" + query;
    return get(context, url).then((result) => {
        return result
    })
}

export function get(context: WebPartContext, url: string) {
    return context.spHttpClient.get(url, SPHttpClient.configurations.v1, { headers: getHeader.headers }).then((response) => {
        return response.json().then((json) => {
            console.log(json.value)
            return json.value
        }).catch(err => console.log(err))
    })
}

export function postItem(context: WebPartContext, listName: string, data: any) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items"
    const options: ISPHttpClientOptions = {
        headers: postHeader.headers,
        body: JSON.stringify(data)
    }
    return post(context, url, options).then((result) => {
        return result
    }).catch(err => console.log(err))
}

export function updateItem(context: WebPartContext, listName: string, data: any, id) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items(" + id + ")"
    const options: ISPHttpClientOptions = {
        headers: updateHeader.headers,
        body: JSON.stringify(data)
    }
    return context.spHttpClient.post(url, SPHttpClient.configurations.v1, options).then((result) => {
        return getItemById(context, listName, id).then((result) => {
            return result
        })
    })
}

export function postFile(context, listName, file): Promise<any> {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/RootFolder/files/add(url='" + file.name + "',overwrite=true)?$expand=ListItemAllFields";
    var options: ISPHttpClientOptions = {
        headers: postHeader.headers,
        body: file,
    };
    return post(context, url, options).then((result) => {
        return result
    })
}

export function createFile(context, listName, fileName): Promise<any> {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + context.pageContext.web.serverRelativeUrl + "/" + listName + "')/files/add(url='" + fileName + "',overwrite=true)?$expand=ListItemAllFields"
    var options: ISPHttpClientOptions = {
        headers: postHeader.headers,
    };
    return post(context, url, options).then((result) => {
        return result
    })
}

export function moveFile(context: WebPartContext, listName, originalFileName, newFileName): Promise<any> {
    console.log(originalFileName, newFileName)
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + context.pageContext.web.serverRelativeUrl + "/" + listName + "/" + originalFileName + "')/moveto(newurl = '" + context.pageContext.web.serverRelativeUrl + "/" + listName + "/" + newFileName + "', flags = 1)";
    const options: ISPHttpClientOptions = {
        headers: updateHeader.headers
    }
    return post(context, url, options).then((result) => {
        return result.json()
    }).catch((err) => console.log(err))
}

export function deleteItem(context: WebPartContext, listName: string, id) {
    const url: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/getByTitle('" + listName + "')/items(" + id + ")"

    const options: ISPHttpClientOptions = {
        headers: deleteHeader.headers
    }
    return context.spHttpClient.post(url, SPHttpClient.configurations.v1, { headers: deleteHeader.headers }).then((response) => {
        return response.json()
    })
}

export async function post(context: WebPartContext, url: string, options): Promise<any> {

    return await context.spHttpClient.post(url, SPHttpClient.configurations.v1, options).then((response) => {
        return response.json().then((json) => {
            return json
        })
    })
}

export function loggedUserInfo(context) {
    return context.pageContext.user
}