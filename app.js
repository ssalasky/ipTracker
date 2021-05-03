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
  // Every time 1000 new entries occur run the sort function
  if (Object.keys(counts).length % 1000 === 0) {
    sort();
  }
}

// Handles the sorting functionality here rather than in the requestHandled function
function sort() {
  sorted = Object.entries(counts).sort(compare);
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
  return sorted.slice(0,100);
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
