# Anonymous counts

The hosted copy of Kannada Kali counts a few things so we can tell whether the game works: do people
come back, and which stops do they finish or give up on? It does not learn anything about you.

## What is sent

Short names, one small request each, with nothing attached. `<lang>` is the teaching language (en, hi, or).

| Name | When | What it tells us |
|---|---|---|
| `kali/<lang>/new` | the first time the app is opened on a device | how many people tried it |
| `kali/<lang>/day` | the first open of each day | how much it is used |
| `kali/<lang>/back/d1`, `d3`, `d7`, `d14`, `d30` | once each, the first open on or after that many days | do people come back |
| `kali/<lang>/unit/stop-<id>/start` and `/done` | once per stop per device | how far people get |
| `kali/<lang>/unit/<id>/quit/<question>` | once, the first time a ride is left unfinished | where rides lose people |
| `kali/<lang>/installed` | once, when the app is installed to the home screen | how many install it |

Other units: `drill`, `weak`, `boss`, `lab-twins`, `lab-street`, `lab-trap`, `lab-forge`, `chat-<id>`.

## What is never sent

No name, player profile, progress, answers, save code or typed text. No user id, device id or cookie.
"Came back after a week" is worked out on the phone; only that conclusion is sent. Players sharing one
phone are counted as one.

The counting service ([GoatCounter](https://www.goatcounter.com), open source) sees what any website
sees: the IP address and browser of the request. It says it tells visits apart with a non-identifiable
hash of these and uses no cookies; its privacy policy has the details.

## Turning it off

**You → Settings → Anonymous usage counts.** Off means nothing is sent and anything waiting is thrown away.
A note explaining this is shown once on the map.

Counting is also off when the app runs from `localhost`, in the single-file build, and when
`COUNT_ENDPOINT` in `app/js/config.js` is empty. **If you host your own copy, set that to your own
GoatCounter site or to `''`**, so your players are not counted on someone else's dashboard.

## Offline

Counts wait on the phone (200 at most) and go out the next time there is a connection, so a count can
appear a day or more after it happened.

## How it is built

`app/js/meter.js` keeps a small record and passes events to the `analytics` library in
[wildarc-sutra](https://github.com/yozo06/wildarc-sutra), which decides what to count. Its documentation
explains the design and how to read the numbers.
