if(!Response.prototype.html)
Response.prototype.xml = async function(){
    return new DOMParser().parseFromString(await this.text(), "text/html");
};