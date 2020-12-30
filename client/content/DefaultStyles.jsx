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
  },
  "silver": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.land_parcel": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#bdbdbd"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#e5e5e5"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#9e9e9e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#eeeeee"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#757575"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.arterial": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#757575"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "road.highway": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#dadada"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#616161"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "road.local": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#9e9e9e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#ffffff"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.line": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#e5e5e5"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#eeeeee"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#c9c9c9"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#9e9e9e"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#f5f5f5"
            }
          }
        },
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
            },
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#616161"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f5f5f5"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "default": {
    "FEATURES": {},
    "ELEMENT": {}
  },
  "retro": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.land_parcel": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#dcd2be"
                        }
                      }
                    }
                  },
                  "RULES": {}
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#ae9e90"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {
                "geometry.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#c9b2a6"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "landscape": {
        "FEATURES": {
          "landscape.natural": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#dfd2ae"
                }
              }
            }
          }
        },
        "ELEMENT": {}
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#a5b076"
                        }
                      }
                    }
                  },
                  "RULES": {}
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#447530"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#dfd2ae"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#93817c"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.arterial": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#fdfcf8"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "road.highway": {
            "FEATURES": {
              "road.highway.controlled_access": {
                "ELEMENT": {
                  "ELEMENTS": {
                    "geometry": {
                      "ELEMENTS": {
                        "geometry.stroke": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#db8555"
                            }
                          }
                        }
                      },
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#e98d58"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              }
            },
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#e9bc62"
                        }
                      }
                    }
                  },
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f8c967"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "road.local": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#806b63"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#f5f1e6"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.line": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#dfd2ae"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#8f7d77"
                            }
                          }
                        },
                        "labels.text.stroke": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#ebe3cd"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#dfd2ae"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {
                "geometry.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#b9d3c2"
                    }
                  }
                }
              },
              "RULES": {}
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#92998d"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#ebe3cd"
            }
          }
        },
        "labels": {
          "ELEMENTS": {
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#523735"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f5f1e6"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "dark": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.country": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#9e9e9e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "administrative.land_parcel": {
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
          "administrative.locality": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#bdbdbd"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#757575"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#181818"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#616161"
                            }
                          }
                        },
                        "labels.text.stroke": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#1b1b1b"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#757575"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.arterial": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#373737"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "road.highway": {
            "FEATURES": {
              "road.highway.controlled_access": {
                "FEATURES": {},
                "ELEMENT": {
                  "ELEMENTS": {
                    "geometry": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#4e4e4e"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              }
            },
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#3c3c3c"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "road.local": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#616161"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {
                "geometry.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#2c2c2c"
                    }
                  }
                }
              },
              "RULES": {}
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#8a8a8a"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#757575"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#000000"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#3d3d3d"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#212121"
            }
          }
        },
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
            },
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#757575"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#212121"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "night": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.locality": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#d59563"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#263c3f"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#6b9a76"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#d59563"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.highway": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#1f2835"
                        }
                      }
                    }
                  },
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#746855"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#f3d19c"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {
                "geometry.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#212a37"
                    }
                  }
                }
              },
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#38414e"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#9ca5b3"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#d59563"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#2f3948"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#17263c"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#515c6d"
                        }
                      }
                    },
                    "labels.text.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#17263c"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#242f3e"
            }
          }
        },
        "labels": {
          "ELEMENTS": {
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#746855"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#242f3e"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "aubergine": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.country": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#4b6878"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "administrative.land_parcel": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#64779e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "administrative.province": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#4b6878"
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
        },
        "ELEMENT": {}
      },
      "landscape": {
        "FEATURES": {
          "landscape.man_made": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#334e87"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "landscape.natural": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#023e58"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#023e58"
                        }
                      }
                    }
                  },
                  "RULES": {}
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#3c7680"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#283d6a"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#6f9ba5"
                        }
                      }
                    },
                    "labels.text.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#1d2c4d"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.highway": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#255763"
                        }
                      }
                    }
                  },
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#2c6675"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#b0d5ce"
                            }
                          }
                        },
                        "labels.text.stroke": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#023e58"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#304a7d"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#98a5be"
                        }
                      }
                    },
                    "labels.text.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#1d2c4d"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.line": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {
                    "geometry.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#283d6a"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#3a4762"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#98a5be"
                        }
                      }
                    },
                    "labels.text.stroke": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#1d2c4d"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#0e1626"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#4e6d70"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#1d2c4d"
            }
          }
        },
        "labels": {
          "ELEMENTS": {
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#8ec3b9"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#1a3646"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "candy": {
    "FEATURES": {
      "administrative": {
        "FEATURES": {
          "administrative.land_parcel": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#bdbdbd"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f0f8ff"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#9e9e9e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#e0ffff"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#757575"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.arterial": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#757575"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "road.highway": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#dda0dd"
                    }
                  }
                },
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#616161"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "road.local": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "labels": {
                  "ELEMENTS": {
                    "labels.text": {
                      "ELEMENTS": {
                        "labels.text.fill": {
                          "ELEMENTS": {},
                          "RULES": {
                            "color": {
                              "type": "color",
                              "SET": true,
                              "VALUE": "#9e9e9e"
                            }
                          }
                        }
                      },
                      "RULES": {}
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#dfbfd8"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.line": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#e5e5e5"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#eeeeee"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#e6e6fa"
                }
              }
            },
            "labels": {
              "ELEMENTS": {
                "labels.text": {
                  "ELEMENTS": {
                    "labels.text.fill": {
                      "ELEMENTS": {},
                      "RULES": {
                        "color": {
                          "type": "color",
                          "SET": true,
                          "VALUE": "#9e9e9e"
                        }
                      }
                    }
                  },
                  "RULES": {}
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#f0ffff"
            }
          }
        },
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
            },
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#616161"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f5f5f5"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  },
  "tiger": {
    "FEATURES": {
      "poi": {
        "FEATURES": {
          "poi.park": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f4a460"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#ff8c00"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "road": {
        "FEATURES": {
          "road.highway": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#404040"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#404040"
                }
              }
            }
          },
          "RULES": {}
        }
      },
      "transit": {
        "FEATURES": {
          "transit.line": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#808080"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "transit.station": {
            "FEATURES": {},
            "ELEMENT": {
              "ELEMENTS": {
                "geometry": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#f4a460"
                    }
                  }
                }
              },
              "RULES": {}
            }
          }
        },
        "ELEMENT": {}
      },
      "water": {
        "FEATURES": {},
        "ELEMENT": {
          "ELEMENTS": {
            "geometry": {
              "ELEMENTS": {},
              "RULES": {
                "color": {
                  "type": "color",
                  "SET": true,
                  "VALUE": "#c4bfb1"
                }
              }
            }
          },
          "RULES": {}
        }
      }
    },
    "ELEMENT": {
      "ELEMENTS": {
        "geometry": {
          "ELEMENTS": {},
          "RULES": {
            "color": {
              "type": "color",
              "SET": true,
              "VALUE": "#ffebcd"
            }
          }
        },
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
            },
            "labels.text": {
              "ELEMENTS": {
                "labels.text.fill": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#ff8c00"
                    }
                  }
                },
                "labels.text.stroke": {
                  "ELEMENTS": {},
                  "RULES": {
                    "color": {
                      "type": "color",
                      "SET": true,
                      "VALUE": "#ffffff"
                    }
                  }
                }
              },
              "RULES": {}
            }
          },
          "RULES": {}
        }
      },
      "RULES": {}
    }
  }
}

export default DefaultStyles;
