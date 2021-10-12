if(!Response.prototype.html)
Response.prototype.html = async function(){
    return new DOMParser().parseFromString(await this.text(), "text/html");
};