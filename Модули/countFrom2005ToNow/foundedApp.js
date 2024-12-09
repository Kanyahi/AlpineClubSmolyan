function founded() {
    // Start date (replace with your start date)
    const startDate = new Date("2005-05-22"); // Example: January 1, 2020

    // Current date
    const now = new Date();

    // Calculate the difference in years and months
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();

    // Adjust for cases where the current month is before the start month
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    let foundedCount = document.getElementById('foundedCount');
   foundedCount.textContent = years;
}
founded();