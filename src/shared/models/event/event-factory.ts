import { ValueChecker } from '../../valuechecker';
import { Event } from './event';
import { EventTypeFactory } from '../eventtype';
import { EventNoteFactory } from '../eventnote';

export class EventFactory {

    static empty(): Event {
        return new Event(0, EventTypeFactory.empty(), '', 0, 0, 0, new Date(), null, true, false, false);
    }

    static fromObj(obj: any): Event {

        let event = EventFactory.empty();

        if (obj.id) event.id = obj.id;
        else if (ValueChecker.validNumber(obj.eventId)) {
            event.id = obj.eventId;
        }

        if (obj.eventType) event.eventType = EventTypeFactory.fromObj(obj.eventType);
        else if (ValueChecker.validNumber(obj.eventRefEventType)) {
            event.eventType = EventTypeFactory.fromObj(obj);
        }

        if (obj.description) event.description = obj.description;
        else if (ValueChecker.validString(obj.eventDesc)) {
            event.description = obj.eventDesc.trim();
        }

        if (obj.cashBefore) event.cashBefore = obj.cashBefore;
        else if (ValueChecker.validNumber(obj.eventCashBefore)) {
            event.cashBefore = obj.eventCashBefore;
        }

        if (obj.cashAfter) event.cashAfter = obj.cashAfter;
        else if (ValueChecker.validNumber(obj.eventCashAfter)) {
            event.cashAfter = obj.eventCashAfter;
        }

        if (obj.tip) event.tip = obj.tip;
        else if (ValueChecker.validNumber(obj.eventTip)) {
            event.tip = obj.eventTip;
        }

        if (obj.datetime) event.datetime = new Date (obj.datetime);
        else if (ValueChecker.validDate(obj.eventDT)) {
            event.datetime = obj.eventDT;
        }

        if (obj.timestamp) event.timestamp = new Date(obj.timestamp);
        else if (ValueChecker.validDate(obj.eventTS)) {
            event.timestamp = obj.eventTS;
        }

        if (obj.active) event.active = obj.active;
        else event.active = !!ValueChecker.validBooleanNumber(obj.eventActive);

        if (obj.countedCounter) event.countedCounter = obj.countedCounter;
        else event.countedCounter = !!ValueChecker.validBooleanNumber(obj.eventCountedCounter);

        if (obj.countedStorage) event.countedStorage = obj.countedStorage;
        else event.countedStorage = !!ValueChecker.validBooleanNumber(obj.eventCountedStorage);

        if (obj.note) event.note = EventNoteFactory.fromObj(obj.note);
        else if (ValueChecker.validNumber(obj.eventNoteId)) {
            event.note = EventNoteFactory.fromObj(obj);
        }

        if (obj.noteCount) event.noteHistoryCount = obj.noteCount;

        return event;
    }

    static toDbObject(obj: Event): any {

        let dbEntry: any = {};

        if (obj.eventType) dbEntry.eventRefEventType = obj.eventType.id;
        if (obj.description) dbEntry.eventDesc = obj.description;
        if (ValueChecker.validNumber(obj.cashBefore)) dbEntry.eventCashBefore = obj.cashBefore < 0 ? 0 : obj.cashBefore;
        if (ValueChecker.validNumber(obj.cashAfter)) dbEntry.eventCashAfter = obj.cashAfter < 0 ? 0 : obj.cashAfter;
        if (ValueChecker.validNumber(obj.tip)) dbEntry.eventTip = obj.tip < 0 ? 0 : obj.tip;
        if (obj.datetime) dbEntry.eventDT = obj.datetime;

        if (obj.active) dbEntry.eventActive = obj.active;
        else dbEntry.eventActive = false;

        if (obj.countedCounter) dbEntry.eventCountedCounter = obj.countedCounter;
        else dbEntry.eventCountedCounter = false;

        if (obj.countedStorage) dbEntry.eventCountedStorage = obj.countedStorage;
        else dbEntry.eventCountedStorage = false;

        return dbEntry;
    }
}
