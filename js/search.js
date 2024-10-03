class DictionarySearch {
    constructor() {
        this.apiUrl = 'https://comp4537-lab4-server2.vercel.app/api/definitions';
        this.init();
    }

    // Initialize event listener for the form
    init() {
        document.getElementById('searchForm').addEventListener('submit', (event) => this.handleSearch(event));
    }

    // Handle form submission for search
    async handleSearch(event) {
        event.preventDefault();

        const word = document.getElementById('word').value;

        if (!this.validateInput(word)) {
            alert(strings.response.wordContainsNumbers);
            return;
        }

        try {
            const result = await this.getData(word);
            if (result.definition) {
                const message = this.formatMessage(strings.response.success, { message: `Word: ${result.word}, Definition: ${result.definition}` });
                document.getElementById('result').innerText = message;
            } else {
                const message = this.formatMessage(strings.response.error, { message: result.message });
                document.getElementById('result').innerText = message;
            }
        } catch (error) {
            console.error('Error:', error);
            const message = this.formatMessage(strings.response.genericError, {});
            document.getElementById('result').innerText = message;
        }
    }

    // Validate input fields
    validateInput(word) {
        return /^[a-zA-Z]+$/.test(word.trim());
    }

    // Send GET request to the server
    async getData(word) {
        const response = await fetch(`${this.apiUrl}?word=${word}`, {
            method: 'GET',
        });
        return await response.json();
    }

    // Helper method to replace placeholders in strings
    formatMessage(template, variables) {
        return template.replace(/{(\w+)}/g, (_, key) => variables[key] || '');
    }
}

// Instantiate the class
new DictionarySearch();