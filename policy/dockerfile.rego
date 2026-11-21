package main

import rego.v1

# Compliance rules for the Dockerfiles in this project

# names of build stages, so "FROM build" is not treated as an untagged image
stage_names := {n |
  some j
  input[j].Cmd == "from"
  count(input[j].Value) == 3
  n := input[j].Value[2]
}

# DOCKER-001: base image must have a version tag
deny contains msg if {
  some i
  input[i].Cmd == "from"
  image := input[i].Value[0]
  image != "scratch"
  not image in stage_names
  not contains(image, "@")
  not contains(image, "$")
  not contains(image, ":")
  msg := sprintf("[DOCKER-001] Base image '%s' has no version tag", [image])
}

# DOCKER-002: do not use the latest tag
deny contains msg if {
  some i
  input[i].Cmd == "from"
  image := input[i].Value[0]
  endswith(image, ":latest")
  msg := sprintf("[DOCKER-002] Base image '%s' uses the latest tag", [image])
}

# DOCKER-003: container must not run as root
deny contains msg if {
  user_lines := [i |
    some i
    input[i].Cmd == "user"
  ]
  count(user_lines) == 0
  msg := "[DOCKER-003] No USER instruction found, the container will run as root"
}

deny contains msg if {
  user_lines := [i |
    some i
    input[i].Cmd == "user"
  ]
  count(user_lines) > 0
  last := max(user_lines)
  input[last].Value[0] in {"root", "0"}
  msg := "[DOCKER-003] The last USER instruction is root"
}

# DOCKER-004: no passwords or keys in ENV
secret_words := ["PASSWORD", "SECRET", "TOKEN", "API_KEY", "PRIVATE_KEY"]

# ENV A=1 B=2 is parsed as A, 1, =, B, 2, =   and   ENV A 1 is parsed as A, 1
env_keys(vals) := keys if {
  count(vals) >= 3
  vals[2] == "="
  keys := {vals[k] |
    some k, _ in vals
    k % 3 == 0
  }
} else := {vals[0]}

deny contains msg if {
  some i
  input[i].Cmd == "env"
  some key in env_keys(input[i].Value)
  some word in secret_words
  contains(upper(key), word)
  msg := sprintf("[DOCKER-004] ENV variable '%s' looks like a secret", [key])
}

# DOCKER-005 (warning only): add a HEALTHCHECK
warn contains msg if {
  health := [i |
    some i
    input[i].Cmd == "healthcheck"
  ]
  count(health) == 0
  msg := "[DOCKER-005] No HEALTHCHECK instruction found"
}
