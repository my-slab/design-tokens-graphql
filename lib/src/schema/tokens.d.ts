export declare const tokens = "\n\t\"\"\"\n\tDesign decision associated with a name, at minimum a name/value pair.\n\t\"\"\"\n\tinterface Token {\n\t\t\"\"\"\n\t\tToken's name, often used as an enumeration argument.\n\t\t\"\"\"\n\t\tname: String!\n\t\t\"\"\"\n\t\tToken's value like '#FFFFF' or '14px'.\n\t\t\"\"\"\n\t\tvalue: String!\n\t}\n\n\ttype Color implements Token {\n\t\t\"\"\"\n\t\tToken's name, often used as an enumeration argument.\n\t\t\"\"\"\n\t\tname: String!\n\t\t\"\"\"\n\t\tRepresents a 24bit RGB or 24+8bit RGBA color in the sRGB color space.\n\t\t\"\"\"\n\t\tvalue: String!\n\t}\n\n\ttype Dimension implements Token {\n\t\t\"\"\"\n\t\tToken's name, often used as an enumeration argument.\n\t\t\"\"\"\n\t\tname: String!\n\t\t\"\"\"\n\t\tRepresents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness.\n\t\t\"\"\"\n\t\tvalue: String!\n\t}\n";