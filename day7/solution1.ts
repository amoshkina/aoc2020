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

    printTree(bagTree: Map<string, BagNode>) {
        for (const [name, node] of bagTree.entries()) {
            console.log('!-----!');
            console.log(name);
            console.log(node.children);
        }
    }

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
            // console.log(rule);
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
        // let result: Set<string> = new Set();
        while (queue.length > 0) {
            const item = queue.pop();
            const [node, path] = [item.node, item.path];
            // console.log('\n');
            // console.log('Got node: ', node);

            if (node.bagName == this.keyBag || leads.has(node.bagName)) {
                // console.log('got to leads', leads);
                // result = new Set([...result, ...path]);
                leads = new Set([...leads, ...path]);
                continue;
            }

            if (visited.has(node.bagName)) {
                // console.log('got to visited');
                continue;
            }
            visited.add(node.bagName);

            for (const child of node.children) {
                // console.log('Got child: ', child);
                if (node.bagName == this.keyBag || leads.has(node.bagName)) {
                    // result = new Set([...result, ...path]);
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
        // leads.add(this.keyBag);

        // let result: Set<string> = new Set();
        for (const node of bagLookup.values()) {
            // if (visited.has(node.bagName)) {
            //     continue;
            // }

            if (!node.isRoot) {
                continue;
            }

            // console.log('Starting traversing from: ', node);
            // result = new Set([...result, ...this.traverseBagTree([{node, path: new Set()}], visited, leads)]);

            leads = this.traverseBagTree([{node, path: new Set()}], visited, leads)
        }
        // console.log(`visited size: ${visited.size}, visited: `)
        // for (const v of visited.values()) {
        //     console.log(v, v.length)
        // }
        console.log(`Answer: ${leads.size}`, leads);
    }
}

new Solver().run('./day7/input.txt')
