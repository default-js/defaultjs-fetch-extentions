import xmlToJson from "@default-js/defaultjs-common-utils/src/converter/XmlToJson";

const CONTENTTYPE = "Content-Type";
const XMLREGEX = /.+\/.*(xml|html)/ig

const orgJson = Response.prototype.json;
Response.prototype.json = async function(){
    const contentType = this.headers[CONTENTTYPE];

    if(contentType && XMLREGEX.test(contentType)){
        return xmlToJson(await this.text());
    }

    return orgJson.call(this);
};
    