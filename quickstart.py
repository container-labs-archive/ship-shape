from __future__ import print_function
import pickle
import os.path
import base64
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']



def get_message(service, id):
    results = service.users().messages().get(userId='me', id=id, format="raw").execute()
    msg_str = base64.urlsafe_b64decode(results['raw'].encode('ASCII'))
    return msg_str

def print_messages(service, messages):
    for message in messages:
        m = get_message(service, message['id'])
        print(m)

def search(service, query_string):
    results = service.users().messages().list(userId='me', q=query_string, maxResults=1).execute()
    messages = results.get('messages', [])
    print_messages(service, messages)

def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    # Call the Gmail API
    results = service.users().labels().list(userId='me').execute()
    labels = results.get('labels', [])

    results = service.users().messages().list(userId='me').execute()
    messages = results.get('messages', [])

    # get one message
    results = service.users().messages().get(userId='me', id=messages[0]['id']).execute()
    message = results['snippet']

    # search for "tracking"
    messages = search(service, "tracking")


if __name__ == '__main__':
    main()
