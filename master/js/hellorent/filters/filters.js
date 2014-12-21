
helloRentApp.filter('address', [function() {
	var ADDRESS_LINE_SPLITTER = ", ";
	var ADDRESS_SPACE_SPLITTER = " ";
	var ADDRESS_EMPTY = "";
	
	return function(propertyAddress) {
		if (!propertyAddress) {
			return ADDRESS_EMPTY;
		}

		var address = ADDRESS_EMPTY;

		if (propertyAddress.line1) {
			address += propertyAddress.line1;
		}

		if (propertyAddress.line2) {
			address = propertyAddress.line2 + ADDRESS_LINE_SPLITTER + address;
		}

		if (propertyAddress.city) {
			address += 	ADDRESS_LINE_SPLITTER + propertyAddress.city;

			if (propertyAddress.postCode) {
				address += ADDRESS_SPACE_SPLITTER + propertyAddress.postCode;
			}	
		}

		return address;
	}
	
}]);