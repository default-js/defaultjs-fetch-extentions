import xmlToJson from "@default-js/defaultjs-common-utils/src/converter/XmlToJson";

const CONTENTTYPE = "Content-Type";
const ALLOWED_CONTENTTYPE_REGEX = /.*xml.*/ig
const ALLOWED_FILE_EXTENTION_REGEX = /.+\.(xml)/ig

const orgJson = Response.prototype.json;
Response.prototype.json = async function(){

    const contentType = this.headers.get[CONTENTTYPE];

    let convertToJson = false;
    if(contentType)
        convertToJson = ALLOWED_CONTENTTYPE_REGEX.test(contentType)
    else{
        const url = new URL(this.url, location);
        convertToJson = ALLOWED_FILE_EXTENTION_REGEX.test(url.pathname);
    }

    return convertToJson ? xmlToJson(await this.xml()) : orgJson.call(this);
};
    