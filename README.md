# nest_rabbit

# architecture:

# workspaces
  nest
  service_1
  service_2
  rabbit
  common


# global goals
  make workspaces work
  redone global nest search
  ci

stages
  one (done)
    2 services depends on third
    all 3 workspaces
  
  two (done)
    4th service nest
    two depends on
  
  three
    add database module
    add config module
