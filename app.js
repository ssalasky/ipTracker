const SampleIPs = require('./assets/sample');

let counts = []; // Stores address information with type: {address: string; visits: number}

// Function to be called by web service with each request to store the IP making the request
function requestHandled(address) {
  // Check to make sure the input is a string value
  if (typeof address == 'string') {
    //Check if the counts array has been reset and handle accordingly
    if (counts.length > 0) {
      const index = counts.findIndex(addr => addr.address === address);
      // If the address isn't found in the array a new value should be added;
      // If the address is found the visits count should be incremented
      index >= 0 ? counts[index].visits++ : counts.push({address, visits: 1});
    } else {
      counts.push({address, visits: 1});
    }
  }
}

// Sorts all addresses that have been collected since reset by visit count; Then returns the first 100 values in array
function top100() {
  counts.sort(compare);
  return counts.slice(0, 100);
}

// Simple comparison function
function compare(a, b) {
  const aVisits = a.visits;
  const bVisits = b.visits;
  if (aVisits > bVisits) return -1;
  if (bVisits > aVisits) return 1;

  return 0;
}

// Resets the stored array object
function clear() {
  counts = [];
}


// Testing functionality to load up sample request IPs and sort them
function loadClients() {
  SampleIPs.forEach(i => {
    requestHandled(i);
  });
  const results = top100();

  console.log(results[0].visits > results[results.length - 1].visits);
}

loadClients();
