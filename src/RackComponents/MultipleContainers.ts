// eslint-disable-next-line import/no-unresolved
import {Sortable, Plugins} from "@shopify/draggable";

const Classes = {
    draggable: "StackedListItem--isDraggable",
    capacity: "draggable-container-parent--capacity",
};

export default function MultipleContainers(containers) {
    const containerSelector = "#SimpleList .StackedList";

    if (containers.length === 0) {
        return false;
    }

    const sortable = new Sortable(containers, {
        draggable: ".StackedListItem--isDraggable",
        mirror: {
            appendTo: containerSelector,
            constrainDimensions: true,
        },
    });

    return sortable;
}
