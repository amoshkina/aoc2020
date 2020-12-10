import * as fs from 'fs';

interface BagNode {
    bagName: string;
    children: BagNode[];
    isRoot: boolean;
}

interface QueueItem {
    node: BagNode,
    len: number;
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

    traverseBagTree(queue: QueueItem[], visited: Set<string>) {
        let result: number = 0;
        while (queue.length > 0) {
            const item = queue.pop();
            const [node, len] = [item.node, item.len];
            // console.log('\n');
            // console.log(node, `: processing with path len ${len}`);
            if (visited.has(node.bagName)) {
                continue;
            }
            visited.add(node.bagName);

            for (const child of node.children) {
                // console.log('Got child: ', child);
                if (child.bagName == this.keyBag) {
                    result += len;
                }
                queue.push({node: child, len: len+1});
            }
        }
        return result;

    }

    run(filename: string) {
        const rules: string[] = fs
            .readFileSync(filename, 'utf-8')
            .split('\n');

        const bagLookup: Map<string, BagNode> = this.buildBagTree(rules);

        const visited: Set<string> = new Set();

        let result: number = 0;
        for (const node of bagLookup.values()) {
            if (!node.isRoot) {
                continue;
            }

            // console.log('Starting traversing from: ', node);
            result += this.traverseBagTree([{node, len: 1}], visited)
        }
        // console.log(`visited size: ${visited.size}, visited: `)
        // for (const v of visited.values()) {
        //     console.log(v, v.length)
        // }
        console.log(`Answer: ${result}`);
    }
}

new Solver().run('./day7/input.txt')
