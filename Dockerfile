FROM containerlabs/node-ci:latest

COPY ./ .

CMD ["./deploy-hosting.sh"]
