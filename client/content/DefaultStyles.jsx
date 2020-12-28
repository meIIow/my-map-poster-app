const DefaultStyles = {
  "transit": {
    "FEATURES": {
      "road": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {},
          "RULES": {
            "visibility": {
              "type": "choice",
              "options": [
                "on",
                "off",
                "simplified"
              ],
              "SET": true,
              "VALUE": "on"
            }
          }
        }
      },
      "transit": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {},
          "RULES": {
            "visibility": {
              "type": "choice",
              "options": [
                "on",
                "off",
                "simplified"
              ],
              "SET": true,
              "VALUE": "on"
            }
          }
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {},
      "RULES": {
        "visibility": {
          "type": "choice",
          "options": [
            "on",
            "off",
            "simplified"
          ],
          "SET": true,
          "VALUE": "off"
        }
      }
    }
  },
  "simple": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {},
          "RULES": {
            "visibility": {
              "type": "choice",
              "options": [
                "on",
                "off",
                "simplified"
              ],
              "SET": true,
              "VALUE": "off"
            }
          }
        }
      },
      "poi": {
        "FEATURES": {
          "poi.attraction": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {},
              "RULES": {
                "visibility": {
                  "type": "choice",
                  "options": [
                    "on",
                    "off",
                    "simplified"
                  ],
                  "SET": true,
                  "VALUE": "off"
                }
              }
            }
          },
          "poi.business": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {},
              "RULES": {
                "visibility": {
                  "type": "choice",
                  "options": [
                    "on",
                    "off",
                    "simplified"
                  ],
                  "SET": true,
                  "VALUE": "off"
                }
              }
            }
          }
        },
        "ELEMENT": {}
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "labels": {
          "ELEMENTS": {
            "labels.icon": {
              "ELEMENTS": {},
              "RULES": {
                "visibility": {
                  "type": "choice",
                  "options": [
                    "on",
                    "off",
                    "simplified"
                  ],
                  "SET": true,
                  "VALUE": "off"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  }
};

export default DefaultStyles;
