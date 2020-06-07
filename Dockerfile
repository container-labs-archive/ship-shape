FROM containerlabs/node-ci:latest

COPY ./ .

CMD ["./deploy-firebase.sh"]
