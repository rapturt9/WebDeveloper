# Use the official Puppeteer image with necessary dependencies
FROM buildkite/puppeteer:latest

# Install necessary packages and add Google Chrome's GPG key
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    python3 \
    python3-pip \
    python3-setuptools \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# Add Google's GPG key to verify the Chrome repository
RUN curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/google-linux-signing-keyring.gpg

# Add the Google Chrome repository to sources.list with the keyring
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/google-linux-signing-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list

# Update APT sources again to include the newly added Chrome repository
RUN apt-get update && apt-get install -y --no-install-recommends \
    google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# Install SingleFile CLI
RUN npm install 'gildas-lormeau/SingleFile#master'

# Set the working directory
WORKDIR /opt/app

# Copy application files
COPY requirements.txt .
COPY webserver.py .

# Install Python dependencies
RUN pip3 install --no-cache-dir --no-warn-script-location -r requirements.txt

# Clean up
RUN rm requirements.txt

# Install Gunicorn for serving the Flask app
RUN pip3 install gunicorn

# Expose port 80
EXPOSE 80

# Define environment variables
ENV SINGLEFILE_EXECUTABLE=/node_modules/single-file/cli/single-file
ENV BROWSER_PATH=/usr/bin/google-chrome
ENV BROWSER_ARGS="--no-sandbox"

# Start the Flask web server using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:80", "webserver:app"]
