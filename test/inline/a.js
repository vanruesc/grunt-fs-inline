var fs = require("fs");

var a = {
	b: {
		c: fs.readFileSync("test/inline/s.frag", "utf-8")
	}
};
