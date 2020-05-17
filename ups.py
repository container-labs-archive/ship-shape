# https://www.ups.com/upsdeveloperkit/downloadresource?loc=en_US

class Tracker:
  def parse():

# this link doesn't help us
# http://support.bikeflights.com/ls/click?upn=xHZRp7is2WYoj1qAYV5-2FvKo5nq0zxbbuzIUigu7E12F2PbDAY5V4ZNv9nDLPU36nIfUqlMHU-2BFqOEst0bV5CxpNSYnp-2B4eIu7OB9qM4gwt4-3DBS9N_IwwEy86Pq9-2F9-2BANTnJC0s6sHAuQMJjM4vzIFeLumV3fX5ZF7xs0673WlraFObeCxwDZ418t0d2gCFTkf4GGydiWNvst3X9Avh6SyqfiIVot8E-2F8b5xRE9znj0Mpi3XH4nzSo8xvjVgVoyjO1RvxE67c-2B3kb9dthICDigK-2BtL1H54og1Y8O0fUoMaWMR7mp2O-2FctfOfTmxTpbJX3FTCl1VthfOstPWSuxr8kWIwQ28tx5CBndqSCa1z2Vbks-2FAdbK
# the tracking number can be shopped around
# 1Z37X1314235389520


# parsing
# search for links first
# if found, we can determine the type
# if not, search for tracking numbers and try them against the tracking APIs

class UPSTracker extends Tracker:
  # try to find UPS tracking links?
  def parse():
