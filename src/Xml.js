if(!Response.prototype.xml)
Response.prototype.xml = async function(){
    return new DOMParser().parseFromString(await this.text(), "application/xml");
};