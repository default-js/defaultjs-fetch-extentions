import "../../../index";

describe("test", () => {
	beforeAll(() => {});	
	
	it("xml-file", async () => {
		const file = await fetch("/data/xml-file.xml");
		file.headers["Content-Type"] = "application/xml";
		const json = await file.json();
		
		console.log(JSON.stringify(json));
		expect(json).toBeDefined();
	});

	it("json-file", async () => {
		const file = await fetch("/data/json-file.json");
		file.headers["Content-Type"] = "application/json";
		const json = await file.json();

		console.log(JSON.stringify(json));
		expect(json).toBeDefined();
	});
});