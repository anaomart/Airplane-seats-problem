function AirplaneSeats(seats, passengers) {
    const totalSeats = seats.reduce((acc, [rows, cols]) => acc + rows * cols, 0);
    if(totalSeats < passengers) {
        return "There is no enough space"
    }
    const seatsSize = seats.length;
    const plane = []
    let counter = 1;
    const numberOfPassengersSeats = {
        "Window seat": 0,
        "Aisle seat": 0,
        "Middle seat": 0,
    };
    // making arrays for seats | space Complexity :  O(r*c) (r = row ,c= column) , Time Complexity: O(N)
    function setPlaneSeats() {
        for (let i = 0; i < seatsSize; i++) {
            plane.push(Array(seats[i][0] * seats[i][1]).fill(0))
        }
    }
    // put tag on every seat wither if it's Aisle seat or Middle seat | space Complexity : O(1) , Time Complexity: O(r*c) (r = row ,c= column)
    // since you go over every element once and we can say it's O(N)
    function getSeatsLocation() {
        for (let i = 0; i < plane.length; i++) {
            let rowLength = seats[i][0]
            for (let j = 0; j < plane[i].length; j++) {
                const seatLocation = j + 1
                if (seatLocation % rowLength == 0 || seatLocation % rowLength == 1) {
                    if ((i == 0 && seatLocation % rowLength == 1) || (i == seatsSize - 1 && seatLocation % rowLength == 0)) {
                        plane[i][j] = 'Window seat'
                        numberOfPassengersSeats['Window seat']++
                    } else {
                        plane[i][j] = 'Aisle seat'
                        numberOfPassengersSeats['Aisle seat']++
                    }
                } else {
                    plane[i][j] = 'Middle seat'
                    numberOfPassengersSeats['Middle seat']++

                }
            }
        }
    }
    // put numbers on seats from front row to back ,and starting from left to right  | time complexity : O(N)
    function setSeatNumberByTag(tag) {
        let i = 0;
        let column = 0;
        while (counter <= passengers && numberOfPassengersSeats[tag]) {

            const rowLength = seats[i][0]
            for (let j = 0; j <= rowLength - 1; j++) {
                if (plane[i][j + (rowLength * column)] == tag) {
                    if (counter > passengers) {
                        counter--;
                        return;
                    };
                    plane[i][j + (rowLength * column)] = counter++
                        numberOfPassengersSeats[tag]--
                }
            }
            if (i == seatsSize - 1) {
                i = -1;
                column++
            }
            i++
        }
    }
    setPlaneSeats()
    getSeatsLocation()
    setSeatNumberByTag('Aisle seat')
    setSeatNumberByTag('Window seat')
    setSeatNumberByTag('Middle seat')

    return plane
}

const seats = [
    [3, 2],
    [4, 3],
    [2, 3],
    [3, 4]
]
console.log(AirplaneSeats(seats, 36))
