import * as fs from 'fs';

interface BagNode {
    bagName: string;
    children: BagNode[];
    isRoot: boolean;
}

interface QueueItem {
    node: BagNode,
    path: Set<string>;
}


class Solver {

    bagRegex = new RegExp(/^(\d+) (.*) bag.?\.?$/);

    keyBag = 'shiny gold';

    getBagPtr(bagName: string, bagLookup: Map<string, BagNode>): BagNode {
        // creating a new node for the given bag and adding it to the lookup
        if (!bagLookup.has(bagName)) {
            bagLookup.set(bagName, {
                bagName: bagName,
                children: [],
                isRoot: false
            });
        }
        return bagLookup.get(bagName);
    }

    buildBagTree(rules: string[]): Map<string, BagNode> {
        const bagLookup: Map<string, BagNode> = new Map();
        const allChildren: Set<string> = new Set();

        for (const rule of rules) {
            const [outerBag, innerBags] = rule.split(' bags contain ');
            

            const outerBagNode: BagNode = this.getBagPtr(outerBag, bagLookup);


            if (innerBags == 'no other bags.') {
                continue;
            }

            for (const bagStr of innerBags.split(',').map(bagStr => bagStr.trim())) {
                const [, count, bagName] = bagStr.match(this.bagRegex);
                outerBagNode.children.push(this.getBagPtr(bagName, bagLookup));
                allChildren.add(bagName);
            }
        }

        for (const node of bagLookup.values()) {
            if (!allChildren.has(node.bagName)) {
                node.isRoot = true;
            }
        }
        

        return bagLookup;
    }

    traverseBagTree(queue: QueueItem[], visited: Set<string>, leads: Set<string>) {
        while (queue.length > 0) {
            const item = queue.pop();
            const [node, path] = [item.node, item.path];

            if (node.bagName == this.keyBag || leads.has(node.bagName)) {
                leads = new Set([...leads, ...path]);
                continue;
            }

            if (visited.has(node.bagName)) {
                continue;
            }
            visited.add(node.bagName);

            for (const child of node.children) {
                if (node.bagName == this.keyBag || leads.has(node.bagName)) {
                    leads = new Set([...leads, ...path]);
                }
                const pathClone: Set<string> = new Set(path);
                pathClone.add(node.bagName);
                queue.push({node: child, path: pathClone});
            }
        }
        return leads;

    }

    run(filename: string) {
        const rules: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n');

        const bagLookup: Map<string, BagNode> = this.buildBagTree(rules);

        const visited: Set<string> = new Set();
        let leads: Set<string> = new Set();

        for (const node of bagLookup.values()) {

            if (!node.isRoot) {
                continue;
            }

            leads = this.traverseBagTree([{node, path: new Set()}], visited, leads)
        }

        console.log(`Answer: ${leads.size}`);
    }
}

new Solver().run('./day7/input.txt')
