package fr.startintech.essentiel.exeption;

public class InvalidEntryException extends RuntimeException {

    public InvalidEntryException() {
        super();
    }

    public InvalidEntryException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public InvalidEntryException(final String message) {
        super(message);
    }

    public InvalidEntryException(final Throwable cause) {
        super(cause);
    }

}
