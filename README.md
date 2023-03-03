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
  one
    2 services depends on third
    all 3 workspaces
