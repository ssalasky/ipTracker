let counts = {}; // Stores address information with type: {address: visits}
let sorted = [];

// Function to be called by web service with each request to store the IP making the request
function requestHandled(address) {
  // Check to make sure the input is a string value
  if (typeof address == 'string') {
    // Find if address exists as a key on the object;
    // If key does exist, increment;
    // If key does not exist create entry with base value of 1 visit
    address in counts ? counts[address]++ : counts[address] = 1;
  }
  // Call the sort function to verify the top 100 records are still accurate
  sort([address, counts[address]]);
}

// Handles the sorting functionality here rather than in the requestHandled function
function sort(record) {
  // Check to see if 100 addresses have been recorded yet; if not do a simple sort; if yes move to more advanced sort
  if (sorted.length < 100) {
    sorted = Object.entries(counts).sort(compare);
  } else {
    // Check to see if the address already exists in the top 100;
    const addrIndex = sorted.findIndex(addr => addr[0] === record[0]);
    // If the address already exists just update the record and re-sort the array;
    if (addrIndex >= 0) {
      sorted[addrIndex] = record[1];
      sorted = Object.entries(sorted).sort(compare);
    } else {
      // Get the lowest number of visits for a unique IP
      let lowestValue = sorted[99][1];
      // Check to see if the lowest value is lower than the address we are evaluating
      if (record[1] > lowestValue) {
        // Get the first index for an address with the lowest value; We want to get the first index in case there are duplicates
        let index = sorted.findIndex(arr => arr[1] === lowestValue);
        // Insert the record
        sorted.splice(index, 0, record);
        // Remove the last record to make sure the array only contains 100 values
        sorted.slice(99, 1);
      }
    }
  }
}

// Simple comparison function
function compare(a, b) {
  const aVisits = a[1];
  const bVisits = b[1];
  if (aVisits > bVisits) return -1;
  if (bVisits > aVisits) return 1;

  return 0;
}

// Simply returns the first 100 values of the pre-sorted addresses array
function top100() {
  return sorted;
}

// Resets the stored array object
function clear() {
  counts = {};
  sorted = [];
}


// Testing functionality to generate sample IPs and send to the function. This limits each section of the address to 10 values to increase the changes of duplicates;
function loadClients() {
  for (let i = 0; i <= 5000; i++) {
    let ip = (Math.floor(Math.random() * 10) + 1)+"."+(Math.floor(Math.random() * 10))+"."+(Math.floor(Math.random() * 10))+"."+(Math.floor(Math.random() * 10));
    requestHandled(ip);
  }
  console.log(sorted[0][1] > sorted[99][1]);
}
