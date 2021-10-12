import xmlToJson from "@default-js/defaultjs-common-utils/src/converter/XmlToJson";

const CONTENTTYPE = "Content-Type";
const CONTENTTYPE_LOWERCASE = CONTENTTYPE.toLowerCase();
const ALLOWED_CONTENTTYPE_REGEX = /.*xml.*/ig
const ALLOWED_FILE_EXTENTION_REGEX = /.+\.(xml)/ig

const orgJson = Response.prototype.json;
Response.prototype.json = async function(){

    const headers = this.headers;
    const contentType = headers.get(CONTENTTYPE) || headers.get(CONTENTTYPE_LOWERCASE);

    let convertToJson = false;
    if(contentType)
        convertToJson = ALLOWED_CONTENTTYPE_REGEX.test(contentType)
    else{
        const url = new URL(this.url, location);
        convertToJson = ALLOWED_FILE_EXTENTION_REGEX.test(url.pathname);
    }

    return convertToJson ? xmlToJson(await this.xml()) : orgJson.call(this);
};
    