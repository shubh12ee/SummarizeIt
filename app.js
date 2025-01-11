document.getElementById('summarizeBtn').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;

    if (inputText.trim() === '') {
        alert('Please enter some text to summarize.');
        return;
    }

    
    const apiUrl = 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn';

    
    const apiKey = 'MY_API_KEY';

    
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    
    const body = JSON.stringify({
        inputs: inputText
    });

    
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: body
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById('summaryText').innerText = 'Error: ' + data.error;
        } else {
            const summary = data[0].summary_text;
            document.getElementById('summaryText').innerText = summary;
        }
    } catch (error) {
        console.error('Error fetching summary:', error);
        document.getElementById('summaryText').innerText = 'An error occurred while fetching the summary.';
    }
});
