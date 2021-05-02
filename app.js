const SampleIPs = require('./assets/sample');

let counts = {}; // Stores address information with type: {address: visits}

// Function to be called by web service with each request to store the IP making the request
function requestHandled(address) {
  // Check to make sure the input is a string value
  if (typeof address == 'string') {
    // Find if address exists as a key on the object;
    // If key does exist, increment;
    // If key does not exist create entry with base value of 1 visit
    address in counts ? counts[address]++ : counts[address] = 1;
  }
}

// Sorts all addresses that have been collected since reset by visit count; Then returns the first 100 values in array
function top100() {
  // Turns each key/value pair into an array and then sends to compare function
  const sorted = Object.entries(counts).sort(compare);
  const results = [];
  sorted.forEach(arr => {
    // Returns the address and visit counts in an object that can be iterated over on a frontend dashboard
    results.push({address: arr[0], visits: arr[1]});
  });
  // Ensures that only the first 100 results are returned
  return results.slice(0,100);
}

// Simple comparison function
function compare(a, b) {
  const aVisits = a[1];
  const bVisits = b[1];
  if (aVisits > bVisits) return -1;
  if (bVisits > aVisits) return 1;

  return 0;
}

// Resets the stored array object
function clear() {
  counts = {};
}


// Testing functionality to load up sample request IPs and sort them
function loadClients() {
  SampleIPs.forEach(i => {
    requestHandled(i);
  });
  const results = top100();

  console.log(results[0].visits > results[results.length - 1].visits);
}
