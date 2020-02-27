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

//Faster Sorts
	//There is a family of sorting algorithms that can improve time complexity from O(n^2) to O(n log n)
	//There's a tradeoff between efficiency and simplicity
	//The more efficient algorithms are much less soimple, and generally tak elonger to understand

//======================== mergeSort Introduction ========================
	//It's a combination of two things - merging and sorting! (also splitting up)
	//Exploits the fact that arrays of 0 or 1 element are always sorted
	//Works by decomposing an array into smaller arrays of 0 or 1 elements then building up a newly sorted array

//How does it Work
[6,3,5,4,7,6,1,2]  --> [8,3,5,4] [7,6,1,2]  -->  [8,3] [5,4] [7,6] [1,2]  --> [8][3][5][4][7][6][1][2]
 -->  [3,8] [4,5] [6,7] [1,2]  -->  [3,4,5,8] [1,2,6,7]  -->  [1,2,3,4,5,6,7,8]


//======================================== Merging Arrays ========================================
	//In order to implement merge sort, it's useful to first implement a function responsible for merging two sorted arrays
	//Given two arrays which are sorted, this helped function should create a new array which is also sorted, an dconsists of all the elements in the two input arrays
	//This function should run in O(n + m) time and O(n+m) space and SHOULD NOT modify the parameters passed to it.

//Merging Arrays Pseudocode
	//Create an empty array, take a look at the smallest values in each input array
	//While there are still values we haven't looked at ...
		//If the value in the first array is smaller than the value in the second array, push the value in the first array into out results and move on to the nexzt value in the first array
		//If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next value in the second array
		//Once we exhaust one array, push in all remaining values from the other array

function mergeArr(arr1, arr2){
	let result = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr2[j] > arr1[i]) {
			result.push(arr1[i]);
			i++;
			//If the value in the first array is smaller than the value in the second array, 
			//push the value in the first array into out results
			//and move on to the next value in the first array
		} else {
			result.push(arr2[j]);
			j++;
			//If the value in the first array is larger than the value in the second array,
			//push the value in the second array into our results
			//and move on to the next value in the second array
		}
	}
	//
	while (i < arr1.length) {
		result.push(arr1[i]);
		i++;
	}
	//taking what every's left in the 1st array and pushing it into results
	while (j < arr2.length) {
		result.push(arr2[j]);
		j++;
	}
	//taking what every's left in the 2nd array and pushing it into results
	return result;
}
//helper function for mergeSort that sorts two arrays and merges them

console.log(mergeArr([1,10,50], [2,14,99,100]));

//==================================== mergeSort Pseudocode ====================================
	//Break up the array into halves until you have arrays that are empty of have one element
	//Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you are back at the full length of the array

function mergeSortME(arr) {
	if (arr.length <= 1) return arr;
	//if arr.length === 1 then it's sorted
	let middle = Math.floor(arr.length / 2);
	//set variable to find the middle point in the arr in order to divide and conquer
	let left = mergeSortME(arr.slice(0, middle));
	//recursively calling mergeSort on left half of data
	let right = mergeSortME(arr.slice(middle));
	//recursively calling mergeSort on right half of data
	return mergeArr(left, right);\
	//using mergeArr helper function to merge the already sorted arrays
}

console.log(mergeSortME([10,24,2,76,73,9,1]));



//====================================Big O of mergeSort====================================

//Time Complexity (Best)		Time Complexity(Avg)		Time Complexity(Worst)		Space Complexity
//0(n log n)					O(n log n)					O(n log n)					O(n)

32 --> 16 16 --> 8 8 8 8 --> 4 4 4 4 4 4 4 4 --> 2222222222222222 --> 11111111111111111111111111111111