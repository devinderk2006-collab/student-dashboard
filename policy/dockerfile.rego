package main

import rego.v1

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
