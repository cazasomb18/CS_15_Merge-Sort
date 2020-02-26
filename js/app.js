//===========================Section 15 - Merge-Sort===========================


//========================Intermediate Sorting Algorithms========================
//Objectives
	//Understand the limitations of what we've learned so far (selection, bubble, insertion)
	//Implement merge sort
	//Implement quick sort
	//Implement radix sort

//Why learn this?  
	//The sorting algorithms we've learned so far don't scale well (only work well one smaller data sets)
 	//Try out bubble sort on an array of 100000 elements, it will take quite some time!

function bubbleSort(arr) {
	let noSwaps;
	for (let i = arr.length; i > 0; i--) {
		noSwaps = true;
		for(let j = 0; j < i - 1; j++) {
			if (arr[j] > arr[j + 1]) {
				var temp = arr[j];
				arr[j] = arr[j + 1];
				arr[j+1] = temp;
				noSwaps = false;
			}
		}
		if(noSwaps) break;
	}
	return arr;
}

function merge(arr1, arr2) {
	let results = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr2[j] > arr1[i]) {
			results.push(arr1[i]);
			i++;
		} else {
			results.push(arr2[j]);
			j++;
		}
	}
	while (i < arr1.length) {
		results.push(arr1[i]);
		i++;
	}
	while (j < arr2.length) {
		results.push(arr2[j]);
		j++;
	}
	return results
}

function mergeSort(arr) {
	if (arr.length <= 1) return arr;
	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

var data = Array.apply(null, {length: 100000}).map(Function.call, Math.random) //creates an array of 100,000 elements w/ a random value
// console.log(bubbleSort(data));
//this took over 30 seconds to complete this task in the console
console.log(mergeSort(data));
//task was completed in less than 1 second

