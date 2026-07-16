from enum import Enum


class EntryType(str, Enum):
    JOURNAL = "journal"
    GRATITUDE = "gratitude"