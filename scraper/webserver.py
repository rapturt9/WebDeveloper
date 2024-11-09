import subprocess
from flask import Flask, request, Response

app = Flask(__name__)

# Environment variables can be set via Docker or docker-compose
SINGLEFILE_EXECUTABLE = '/node_modules/single-file/cli/single-file'
BROWSER_PATH = '/usr/bin/google-chrome'
BROWSER_ARGS = '--no-sandbox'  # Changed to a string for subprocess

@app.route('/', methods=['POST'])
def singlefile():
    url = request.form.get('url')
    if not url:
        return Response('Error: url parameter not found.', status=400)
    
    try:
        # Construct the command without extra quotes
        command = [
            SINGLEFILE_EXECUTABLE,
            f'--browser-executable-path={BROWSER_PATH}',
            f'--browser-args={BROWSER_ARGS}',
            url,
            '--dump-content'
        ]
        
        # Execute the SingleFile CLI command
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            check=True,
            text=True  # Return output as string
        )
        
        singlefile_html = result.stdout
        return Response(singlefile_html, mimetype="text/html")
    
    except subprocess.CalledProcessError as e:
        error_message = f'Error processing URL: {e.stderr}'
        return Response(error_message, status=500)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
