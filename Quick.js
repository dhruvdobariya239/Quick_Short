
        async function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function visualizeQuickSort() {
            var arrayInput = document.getElementById('arrayInput').value;
            var originalArray = arrayInput.split(',').map(Number);
            var arrayContainer = d3.select('#arrayContainer');
            var loader = document.getElementById('loader2');
           

            loader.style.display = 'inline-block';
            // Clear previous visualization
            arrayContainer.selectAll('*').remove();

            // Display the original array
            displayArray(originalArray);

            // Perform Quick Sort and visualize each step
            await quickSort(originalArray, 0, originalArray.length - 1);

            loader.style.display = 'none';


            // Display the final sorted array
            displayFinalArray(originalArray);
            
        }

        async function quickSort(arr, low, high) {
            if (low < high) {
                var pivotIndex = await partition(arr, low, high);
                await quickSort(arr, low, pivotIndex - 1);
                await quickSort(arr, pivotIndex + 1, high);
            }
        }

        async function partition(arr, low, high) {
            var pivot = arr[high];
            var i = low - 1;

            for (var j = low; j < high; j++) {
                if (arr[j] <= pivot) {
                    i++;
                    await swap(arr, i, j);
                    await displayArray(arr, j, i);
                }
            }

            await swap(arr, i + 1, high);
            await displayArray(arr, i + 1, high);

            return i + 1;
        }

        async function swap(arr, i, j) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            await sleep(1000); // Pause for better visualization
        }

        async function displayArray(arr, pivotIndex, swapIndex) {
            var arrayContainer = d3.select('#arrayContainer');

            arrayContainer.selectAll('.arrayElement')
                .data(arr)
                .join('div')
                .attr('class', d => d === arr[pivotIndex] ? 'arrayElement pivotElement' : 'arrayElement')
                .text(d => d);

            await sleep(1000); // Pause for better visualization
        }

        function displayFinalArray(arr) {
            var finalArrayContainer = d3.select('#finalArray');

            finalArrayContainer.html('<h3 id="h4">Final Sorted Array:</h3>');
            finalArrayContainer.append('div')
                // .attr('class', 'arrayElement')
                .selectAll('div')
                .data(arr)
                .enter().append('div')
                .text(d => d)
                // .style('background-color', 'lightblue')
                .style('transition', 'background-color 0.3s');

         
        }
        function refresh(){
            location.reload();
            
        }
    