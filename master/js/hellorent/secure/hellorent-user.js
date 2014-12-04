function RentalRecord(address, rentedFor, movedIn, movedOut) {
	this.address = address;
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
	}
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

