import "../../../index";

describe("test", () => {

	const HEADER_CONTENTYPE = "Content-Type";

	beforeAll(() => {});	
	
	it("xml-file", async () => {
		const file = await fetch("/data/xml-file.xml");
		if(!file.headers.has(HEADER_CONTENTYPE))
			file.headers.set(HEADER_CONTENTYPE, "application/xml");
		const json = await file.json();
		
		console.log(JSON.stringify(json));
		expect(json).toBeDefined();
	});

	it("json-file", async () => {
		const file = await fetch("/data/json-file.json");
		if(!file.headers.has(HEADER_CONTENTYPE))
			file.headers.set(HEADER_CONTENTYPE, "application/json");
		const json = await file.json();

		console.log(JSON.stringify(json));
		expect(json).toBeDefined();
	});
});