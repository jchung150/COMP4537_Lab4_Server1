class DictionaryStore {
    constructor() {
        this.apiUrl = 'https://comp4537-lab4-server2.vercel.app/api/definitions';
        this.init();
    }

    // Initialize event listener for the form
    init() {
        document.getElementById('storeForm').addEventListener('submit', (event) => this.handleSubmit(event));
    }

    // Handle form submission
    async handleSubmit(event) {
        event.preventDefault();

        const word = document.getElementById('word').value;
        const definition = document.getElementById('definition').value;

        if (!this.validateInput(word)) {
            alert(strings.response.wordContainsNumbers);
            return;
        }

        const data = { word, definition };

        try {
            const response = await this.postData(data);
            const message = this.formatMessage(strings.response.success, { message: response.message });
            document.getElementById('result').innerText = message;
        } catch (error) {
            console.error('Error:', error);
            const message = this.formatMessage(strings.response.genericError, {});
            document.getElementById('result').innerText = message;
        }
    }

    // Validate input fields
    validateInput(word) {
        return /^[a-zA-Z]+$/.test(word);
    }

    // Send POST request to the server
    async postData(data) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    }

    // Helper method to replace placeholders in strings
    formatMessage(template, variables) {
        return template.replace(/{(\w+)}/g, (_, key) => variables[key] || '');
    }
}

// Instantiate the class
new DictionaryStore();