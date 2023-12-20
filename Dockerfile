FROM denoland/deno:alpine

WORKDIR /app

# Prefer not to run as root.
USER deno

# These steps will be re-run upon each file change in your working directory:
COPY deno.json deno.lock main.ts .

COPY src/ ./src
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.ts

CMD ["task", "start"]