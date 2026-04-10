---
title: 'Setup'
sidebar_label: 'Setup'
sidebar_position: 1
---

# Setup

Get the CLI authenticated and ready to use.

## login

`longbridge login` authenticates via OAuth 2.0 device authorization flow — works in any
environment including SSH, headless servers, and CI.

<CliCommand>
longbridge login
</CliCommand>

Running `login` prints a URL and a short code. Open the URL in any browser, enter the code,
and authorize. The token is saved to `~/.longbridge/openapi/tokens/<client_id>` and reused
automatically by all subsequent commands.

For environments where you can't open a browser on the same machine:

<CliCommand>
# Prints the auth URL; authorize in a browser, then paste the redirect URL back
longbridge login --headless
</CliCommand>

## logout

Clears the stored OAuth token. The next command or TUI launch will trigger re-authentication.

<CliCommand>
longbridge logout
</CliCommand>

## check

Verifies token validity and API connectivity. Shows token status, cached region, and latency
to both Global and CN API endpoints. Does not require an active market session.

<CliCommand>
longbridge check
longbridge check --format json
</CliCommand>

## update

Downloads and runs the official install script to replace the current binary with the latest release.

<CliCommand>
longbridge update
</CliCommand>
