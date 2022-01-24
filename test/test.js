const assert = require('assert');
const {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} = require('@firebase/rules-unit-testing');
const { doc, setDoc } = require('firebase/firestore');

const MY_PROJECT_ID = 'emulator-rules';
const myId = 'user_abc';
const theirId = 'user_xyz';
const myDocId = 'myDoc123';
const theirDocId = 'theirDoc123';

let testEnv;

// Enforce firestore rules hot update in emulators
before(async () => {
  const fs = require('fs');
  testEnv = await initializeTestEnvironment({
    projectId: MY_PROJECT_ID,
    firestore: {
      host: 'localhost',
      port: 8080,
      rules: fs.readFileSync('./firestore.rules', 'utf8'),
    },
  });
});

// Clear firestore before each test
beforeEach(async () => {
  await testEnv.clearFirestore({ projectId: MY_PROJECT_ID });
});

after(async () => {
  await testEnv.cleanup();
});

describe('Setup', () => {
  it('Understands basic addition, sanity check mocha working', () => {
    assert.equal(2 + 2, 4);
  });

  // Test firestore rules
  it('Allow a user to edit their own document', async () => {
    const user = await testEnv.authenticatedContext(myId);

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), 'test_documents', myDocId),
        { content: 'before', authorId: myId },
      );
    });

    await assertSucceeds(
      setDoc(
        doc(user.firestore(), 'test_documents', myDocId),
        { content: 'after' },
      )
      .then()
    );
  });

  it('Don\'t allow a user to edit somebody else\'s document', async () => {
    const user = await testEnv.authenticatedContext(myId);

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(
        doc(context.firestore(), 'test_documents', theirDocId),
        { content: 'before', authorId: theirId },
      );
    });

    await assertFails(
      setDoc(
        doc(user.firestore(), 'test_documents', theirDocId),
        { content: 'after' },
      )
      .then()
    );
  });
});
