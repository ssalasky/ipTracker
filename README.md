# Code Challenge - IP Tracker

A simple app to track the IP addresses that are making requests to a web service.

Includes functionality to return the top 100 most common requesters.

Separate function to clear out all addresses at the start of each day.

# Background On Application And Challenge

If I had been given more time I would have implemented more robust testing measures. Additionally, I would have built in a timer into the clear function so that it wouldn't require user interaction.

Runtime complexity by function:
- requestHandled: O(n)
- top100: O(n)
- clear: O(1)

The code functions as follows:
- `requestHandled` ingests a value and looks for it in the existing list. If the address has already made a visit that day the visits count will be incremented. If the address has not made a request it will be added to the array and have its visits count set to 1. This function was made to be simple in order to handle as many requests as possible as it will be called every time the application handles a request.
- `top100` this function takes the array of objects and sorts based on the visits count. Then it returns just the first 100 values. This function was built to handle the sorting since it will be called slightly less frequently than the storing function. Additionally, by shifting the sorting to this it won't impact the ingestion of addresses.
- `clear` simply resets the address array to being empty.

My original plan was to create an object of IP addresses with the key being the address and the value being the count. Every time a request came in I would then increment the value by one. I chose to not take this route since the sorting became more complex for not much gain. 

A separate plan that I began with was to just append the incoming address to an array of strings in the `requestHandled` function. Then I had an array reduce and count functionality in the `top100` function prior to sorting. This worked fine, but it made the runtime complexity of `requestHandled` O(1) while making the runtime of `top100` O(n2). So I opted to shift some functionality to the ingestion in order to keep the complexity low on each.

To test this application I created a document full of IP addresses. Then I created a function to run through the list to act as requests to the frontend. The function, once it has completed with iterating through the list calls the `top100` function. It verifies that sorting happened by ensuring the first index has a higher number than the final index. As I mentioned earlier, if I had been given more time I would have made this testing and validation more robust.
