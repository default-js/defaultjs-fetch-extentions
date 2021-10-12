if(!Response.prototype.html)
Response.prototype.svg = async function(){
    return new DOMParser().parseFromString(await this.text(), "image/svg+xml");
};