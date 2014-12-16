function RentalRecord(address, rentedFor, movedIn, movedOut) {
	this.address = new Address();
	this.movedIn = movedIn;
	this.movedOut = movedOut;
	this.rentedFor = rentedFor;
}

function WorkRecord(companyName, position, workedFor, from, to) {
	this.companyName = companyName;
	this.position = position;
	this.workedFor = workedFor;
	this.from = from;
	this.to = to;
	this.references = [];
}

function Profile() {
	this.personal = {
		picture: null,
		about: "",
		smoke: null
	};
	this.rentalHistory = [];
	this.workHistory = [];
}

function HelloRentUser(id, email, firstName) {
	this.id = id;
	this.email = email;
	this.firstName = firstName;
	this.surname = null;
	this.phoneNumber = null;
	this.profile = new Profile();
	this.properties = [];
}

function Property(ownerId) {
	this.ownerId = ownerId;
	this.address = new Address();
	this.images = {};
	this.rent = new Rent();
}

function Address() {
	this.line1 = "";
	this.line2 = null;
	this.city = "";
	this.state = "";
	this.postCode = "";
	this.country = new Country("Australia", "AU"); // Default country
}

function Rent() {
	this.amount = null;
	this.currency = null;
	this.type = null;
}

function Country(name, code) {
	this.name = name;
	this.code = code;
} 