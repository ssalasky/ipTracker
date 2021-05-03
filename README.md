# Code Challenge - IP Tracker

A simple app to track the IP addresses that are making requests to a web service.

Includes functionality to return the top 100 most common requesters.

Separate function to clear out all addresses at the start of each day.

# Background On Application And Challenge

If I had been given more time I would have implemented more robust testing measures. Additionally, I would have built in a timer into the clear function so that it wouldn't require user interaction. 

Runtime complexity by function:
- requestHandled: O(1)
- top100: O(1)
- clear: O(1)

The code functions as follows:
- `requestHandled` ingests a value and looks for the value as a key in an object. If the address has already made a visit that day the visits count will be incremented. If the address has not made a request it will be added to the array and have its count set to 1. Then it calls the sort function each request to verify the top 100 are still correct.
- `sort` checks to see if 100 records have been recorded yet. If not then it will just do a simple sort. If 100 addresses have been recorded it will check to see if the number of requests exceeds the lowest amount in the top 100. If it does it will shift the array and add the record and remove the end result. If it does not exceed the amount it is left off.
- `top100` this function returns the 100 values in the sorted array.
- `clear` simply resets the counts object and sorted array to being empty.

My original plan was to create an array of objects and add a new object for each new address. Then the sorting function would just have to iterate through this array and sort it. However, this meant the complexity of the ingestion function was more complicated which would impact performance. So I opted against it.

A separate plan that I began with was to just append the incoming address to an array of strings in the `requestHandled` function. Then I had an array reduce and count functionality in the `top100` function prior to sorting.

To test this application I created a document full of IP addresses. Then I created a function to run through the list to act as requests to the frontend. The function, once it has completed with iterating through the list calls the `top100` function. It verifies that sorting happened by ensuring the first index has a higher number than the final index. As I mentioned earlier, if I had been given more time I would have made this testing and validation more robust.
